import re
import sys
import os
from typing import Dict, List


def extract_friend_name(chat_text: str) -> str:
    """Extract friend name from chat text, handling potential encoding issues."""
    try:
        for line in chat_text.splitlines():
            if ("You have exported a chat with" in line) or (
                "You have exported the chat with" in line
            ):
                # Debug output
                print(f"DEBUG: Found line: {line}")

                regexes_to_try = [
                    # "the chat with [name]" with optional period
                    r"You have exported the chat with \[(.*?)\]\.?",
                    # "the chat with name" with optional period, captures until period or end of line
                    r"You have exported the chat with ([^\.]+)\.?$",
                    # "a chat with [name]" with optional period
                    r"You have exported a chat with \[(.*?)\]\.?",
                    # "a chat with name" with optional period, captures until period or end of line
                    r"You have exported a chat with ([^\.]+)\.?$",
                ]

                for i, regex in enumerate(regexes_to_try):
                    match = re.search(regex, line)
                    if match:
                        friend_name = match.group(1).strip()
                        print(f"DEBUG: Matched with regex #{
                              i + 1}: '{friend_name}'")
                        return friend_name

                print(f"DEBUG: No regex matched line: {line}")

        print("DEBUG: No matching line found in the chat")
        return "unknown_friend"
    except Exception as e:
        print(f"Error in extract_friend_name: {e}")
        return "unknown_friend"


def process_files(file_paths: List[str]) -> Dict[str, str]:
    """Process multiple files and extract names."""
    results = {}

    for file_path in file_paths:
        try:
            print(f"\nProcessing file: {file_path}")
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            first_line = content.splitlines()[0] if content else "Empty file"
            print(f"First line: {first_line}")

            name = extract_friend_name(content)
            results[file_path] = name

        except Exception as e:
            print(f"Failed to process {file_path}: {e}")
            results[file_path] = "error_processing"

    return results


def main():
    if len(sys.argv) < 2:
        print("Usage: python extract_names.py file1.txt file2.txt ...")
        print("Or use wildcard: python extract_names.py *.txt")
        sys.exit(1)

    file_paths = sys.argv[1:]
    results = process_files(file_paths)

    # Print results in a neat table
    print("\nResults:")
    print(f"{'File':<30} | {'Extracted Name':<30}")
    print("-" * 62)

    for file_path, name in results.items():
        # Get just the filename without path
        filename = os.path.basename(file_path)
        print(f"{filename:<30} | {name:<30}")


if __name__ == "__main__":
    main()
