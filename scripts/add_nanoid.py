from nanoid import generate
import json

INPUT_FILE = "<add input file name here>"


def generate_id():
    id = generate(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 21)

    return id


def main():
    with open(INPUT_FILE, encoding="utf-8") as f:
        file = json.loads(f.read())
        for obj in file:
            generated_id = generate_id()
            obj["id"] = generated_id

        print(file, end="")

        output_file = f"{INPUT_FILE.split('.')[0]}_id.json"
        with open(output_file, "w", encoding="utf-8") as o:
            json.dump(file, o, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
