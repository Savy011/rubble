import json
import os
import math
from pathlib import Path

INPUT_FILE = "<add input file name>"
OUTPUT_DIR = "chunks/jihyo"
CHUNK_SIZE = 1000
OUTPUT_NAME = "jihyo"


def chunk_json_file(input_path, output_dir, chunk_size):
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    with open(input_path, "r", encoding="utf-8") as file:
        messages = json.load(file)

    messages.sort(key=lambda x: x.get("timestamp", 0))

    total_messages = len(messages)
    num_chunks = math.ceil(total_messages / chunk_size)

    print(f"Total messages: {total_messages}")
    print(f"Splitting into {num_chunks} chunks of {chunk_size} messages each")

    import_path = os.path.basename(input_path).rsplit(".", 1)[0]

    if OUTPUT_NAME:
        base_name = OUTPUT_NAME
    else:
        base_name = os.path.basename(input_path).rsplit(".", 1)[0]

    metadata = {
        "totalMessages": total_messages,
        "chunks": num_chunks,
        "chunkSize": chunk_size,
        "lastUpdated": import_path,
    }

    with open(
        os.path.join(output_dir, f"{base_name}_metadata.json"), "w", encoding="utf-8"
    ) as meta_file:
        json.dump(metadata, meta_file, ensure_ascii=False, indent=2)

    for i in range(num_chunks):
        start_idx = i * chunk_size
        end_idx = min(start_idx + chunk_size, total_messages)
        chunk = messages[start_idx:end_idx]

        chunk_file = os.path.join(
            output_dir, f"{base_name}_chunk_{i + 1}.json")
        with open(chunk_file, "w", encoding="utf-8") as f:
            json.dump(chunk, f, ensure_ascii=False, indent=2)

        print(
            f"Created chunk {
                i + 1}/{num_chunks}: {chunk_file} with {len(chunk)} messages"
        )


if __name__ == "__main__":
    print(f"Starting to chunk JSON file: {INPUT_FILE}")
    chunk_json_file(INPUT_FILE, OUTPUT_DIR, CHUNK_SIZE)
    print(f"JSON file successfully chunked into {OUTPUT_DIR} directory")
