import re
import json

INPUT_FILE = "<add input file name here>"


def main():
    with open(INPUT_FILE, encoding="utf-8") as f:
        file = json.loads(f.read())
        for obj in file:
            if obj["type"] == "text":
                obj["translation"] = ""
                if "bubble" in obj["text"]:
                    obj["text"] = re.sub(r"bubble", "rubble", obj["text"])
            elif obj["type"] == "sticker":
                obj["src"] = ""
            elif "(Link)" in obj["text"]:
                file.pop(obj)

        print(file, end="")

        output_file = f"{INPUT_FILE.split('.')[0]}_new.json"
        with open(output_file, "w", encoding="utf-8") as o:
            json.dump(file, o, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
