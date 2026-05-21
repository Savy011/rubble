import re
import json
import time
from nanoid import generate
from datetime import datetime, timedelta, timezone
from tqdm import tqdm
import pytz
from tabulate import tabulate


MY_USERNAMES = [
    "cwwww",
    "猪乳宝贝",
    "猪乳宝贝🦔",
    "猪乳宝贝ZHURU🍒",
    "arin"
]
TIMESTAMP_OFFSET = "+8"
INPUT_FILE = "chat_jihyo.txt"

# don't change these
USERNAME_REPLACEMENT = "[y/n]"
TARGET_TIMEZONE = "Asia/Seoul"
DELAY = 0.0001


def extract_friend_name(chat_text: str) -> str:
    try:
        for line in chat_text.splitlines():
            if ("You have exported a chat with" in line) or (
                "You have exported the chat with" in line
            ):
                regexes_to_try = [
                    r"You have exported the chat with \[(.*?)\]\.?",
                    r"You have exported the chat with ([^\.]+)\.?$",
                    r"You have exported a chat with \[(.*?)\]\.?",
                    r"You have exported a chat with ([^\.]+)\.?$",
                ]

                for regex in regexes_to_try:
                    match = re.search(regex, line)
                    if match:
                        friend_name = match.group(1).strip()
                        return friend_name

        return "unknown_friend"
    except Exception:
        return "unknown_friend"


def parse_offset(offset_str):
    if ":" in offset_str:
        hours_part, minutes_part = offset_str.split(":")
        hours = float(hours_part)
        minutes = float(minutes_part) if minutes_part else 0
        if hours < 0 and minutes > 0:
            minutes = -minutes
        return hours, minutes
    else:
        hours = float(offset_str)
        frac_part = abs(hours) - int(abs(hours))
        minutes = frac_part * 60
        return int(hours), minutes


def parse_timestamp(timestamp_str, offset_str="0"):
    formats_to_try = [
        "%Y-%m-%d %I:%M%p",
        "%Y-%m-%d %H:%M",
    ]

    for fmt in formats_to_try:
        try:
            local_offset_hours, local_offset_minutes = parse_offset(offset_str)
            local_tz = timezone(
                timedelta(hours=local_offset_hours,
                          minutes=local_offset_minutes)
            )
            dt = datetime.strptime(timestamp_str, fmt).replace(tzinfo=local_tz)

            kst_timezone = pytz.timezone(TARGET_TIMEZONE)
            dt_kst = dt.astimezone(kst_timezone)

            timestamp_ms = int(dt_kst.timestamp() * 1000)
            return timestamp_ms
        except ValueError:
            continue

    print(f"Warning: Could not parse timestamp '{timestamp_str}'")
    return None


def determine_message_type(message_content):
    """Determine the type of message."""
    if message_content == "(Voice Message)":
        return "audio"
    elif "(Photo)" in message_content:
        return "photo"
    elif "(Video)" in message_content:
        return "video"
    elif message_content.startswith("/") and message_content.endswith("/"):
        return "sticker"
    elif "/Sticker/" in message_content:
        return "sticker"
    elif "bubble LIVE" in message_content:
        return "live"
    else:
        return "text"


def generate_id():
    id = generate(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 21)

    return id


def sanitize_chat(chat_text, usernames, replacement, offset_str):
    messages = []
    stats = {
        "total": 0,
        "text": 0,
        "photo": 0,
        "video": 0,
        "sticker": 0,
        "live": 0,
        "audio": 0,
        "removed": 0,
        "username_replacements": 0,
    }

    lines = chat_text.splitlines()
    header_end = 0

    for i, line in enumerate(lines):
        if line.startswith("Saved Date :"):
            header_end = i + 1
            break

    i = header_end
    progress_bar = tqdm(total=len(lines) - header_end,
                        desc="Processing messages")

    while i < len(lines):
        time.sleep(DELAY)
        line = lines[i].strip()
        progress_bar.update(1)

        if not line:
            i += 1
            continue

        me_match = re.match(
            r"^(\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}(?:AM|PM)?), Me :(.*)", line
        )

        if not me_match:
            me_match = re.match(
                r"^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}), Me :(.*)", line)

        if me_match:
            timestamp_str = me_match.group(1)
            message_content = me_match.group(2).strip()

            next_index = i + 1
            while next_index < len(lines):
                next_line = lines[next_index].strip()
                if not next_line or re.match(r"^\d{4}-\d{2}-\d{2}", next_line):
                    break
                message_content += "\n" + next_line
                i = next_index
                next_index += 1
                progress_bar.update(1)

            stats["removed"] += 1
            i += 1
            continue

        friend_match = re.match(
            r"^(\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}(?:AM|PM)?), (.+ :)(.*)", line
        )

        if not friend_match:
            friend_match = re.match(
                r"^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}), (.+ :)(.*)", line
            )

        if friend_match:
            timestamp_str = friend_match.group(1)
            message_content = friend_match.group(3).strip()

            next_index = i + 1
            while next_index < len(lines):
                next_line = lines[next_index].strip()
                if not next_line or re.match(r"^\d{4}-\d{2}-\d{2}", next_line):
                    break
                message_content += "\n" + next_line
                i = next_index
                next_index += 1
                progress_bar.update(1)

            original_content = message_content
            for username in usernames:
                message_content = message_content.replace(
                    username, replacement)

            if original_content != message_content:
                stats["username_replacements"] += 1

            msg_type = determine_message_type(message_content)

            id = generate_id()

            message = {
                "id": id,
                "timestamp": parse_timestamp(timestamp_str, offset_str),
                "type": msg_type,
                "text": message_content,
            }

            if msg_type in ["photo", "video", "audio"]:
                message["src"] = ""

            if msg_type == "live":
                if i + 1 < len(lines):
                    next_line = lines[i + 1].strip()
                    duration_match = re.match(
                        r"^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}), (.+)$", next_line
                    )

                    if not duration_match:
                        duration_match = re.match(
                            r"^(\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}(?:AM|PM)?), (.+)$",
                            next_line,
                        )

                    if duration_match:
                        duration_str = duration_match.group(2).strip()
                        time_match = re.search(
                            r"(\d{2}:\d{2}:\d{2})", duration_str)
                        if time_match:
                            time_str = time_match.group(1)

                            h, m, s = map(int, time_str.split(":"))
                            total_seconds = h * 3600 + m * 60 + s
                            message["duration"] = total_seconds
                            messages.append(message)
                            stats["total"] += 1
                            stats[msg_type] += 1

                            i += 1
                            progress_bar.update(1)
                            i += 1
                            continue

            messages.append(message)
            stats["total"] += 1
            stats[msg_type] += 1

        i += 1

    progress_bar.close()
    return messages, stats


def main():
    try:
        print(f"Reading chat from '{INPUT_FILE}'...")
        with open(INPUT_FILE, "r", encoding="utf-8") as file:
            chat_text = file.read()

        friend_name = extract_friend_name(chat_text)

        print(f"\nProcessing chat with {friend_name}...")

        messages, stats = sanitize_chat(
            chat_text, MY_USERNAMES, USERNAME_REPLACEMENT, TIMESTAMP_OFFSET
        )

        output_file = f"sanitized_chat_{friend_name}.json"
        print(f"Writing sanitized chat to '{output_file}'...")

        with open(output_file, "w", encoding="utf-8") as file:
            json.dump(messages, file, ensure_ascii=False, indent=2)

        print(
            f"Chat with {friend_name} has been sanitized and saved to '{
                output_file}'"
        )

        table_data = [
            ["Member", friend_name],
            ["Total messages processed", stats["total"]],
            ["Text messages", stats["text"]],
            ["Photo", stats["photo"]],
            ["Video", stats["video"]],
            ["Sticker used", stats["sticker"]],
            ["Lives", stats["live"]],
            ["Audio Messages", stats["audio"]],
            ["Your messages removed", stats["removed"]],
            ["Messages with username replacements",
                stats["username_replacements"]],
        ]

        print("\n=== Statistics ===")
        print(
            tabulate(
                table_data,
                headers=["Metric", "Count"],
                tablefmt="fancy_grid",
                colalign=("left", "right"),
            )
        )
    except FileNotFoundError:
        print(f"Error: File '{INPUT_FILE}' not found.")
    except UnicodeDecodeError:
        print("Error: Unable to decode the file. Ensure it's UTF-8 encoded.")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
