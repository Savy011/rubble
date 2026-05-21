import re
import json

INPUT_FILE = "<add input file name>"


def main():
    with open(INPUT_FILE, encoding="utf-8") as f:
        file = json.loads(f.read())
        for obj in file:
            obj["text"] = re.sub(r"\@\@\@", "[y/n]", obj["text"])
        print(file, end="")

        output_file = f"{INPUT_FILE.split('.')[0]}_fixed.json"
        with open(output_file, "w", encoding="utf-8") as o:
            json.dump(file, o, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
