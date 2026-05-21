import re

INPUT_FILE = "<add input file name>"

try:
    with open(INPUT_FILE, "rb") as file:  # Read as bytes
        raw_bytes = file.read()

    print("Raw bytes (first 3 lines):")
    for i, line in enumerate(raw_bytes.splitlines()[:3]):
        print(f"Line {i + 1}: {line.hex()}")  # Print hex representation
        try:
            print(
                f"Line {i + 1} (utf-8): {line.decode('utf-8', errors='ignore')}")
        except UnicodeDecodeError:
            print(f"Line {i + 1} (decode error)")

    chat_text = raw_bytes.decode("utf-8", errors="ignore")

    friend_name_line = next(
        (
            line
            for line in chat_text.splitlines()
            if "You have exported the chat with" in line
        ),
        None,
    )

    if friend_name_line:
        print("\nLine with friend's name (utf-8):", friend_name_line)

        try:
            print(
                "\nLine with friend's name (latin-1):",
                friend_name_line.encode("latin-1").decode("latin-1"),
            )
        except:
            print("Failed to decode with latin-1")
        try:
            print(
                "\nLine with friend's name (cp1252):",
                friend_name_line.encode("cp1252").decode("cp1252"),
            )
        except:
            print("Failed to decode with cp1252")

        friend_name = None
        regexes_to_try = [
            r"You have exported the chat with \[(.+?)\]\.",
            r"You have exported the chat with (.+?)\.",
            r"\[(.+?)\]",
        ]

        for regex in regexes_to_try:
            match = re.search(regex, friend_name_line)
            if match:
                friend_name = match.group(1).strip()
                break

        if friend_name:
            print("Friend's name (extracted):", friend_name)
        else:
            print("Could not extract friend's name.")

    else:
        print("\nCould not find line with friend's name")


except FileNotFoundError:
    print(f"Error: File '{INPUT_FILE}' not found.")
except Exception as e:
    print(f"An error occurred: {e}")
