from faker import Faker
import csv

fake = Faker()

# Number of entries to generate
num_entries = 100

# Generate dummy data
with open("recipients.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Name", "Email", "Product"])  # Headers
    for _ in range(num_entries):
        name = fake.name()
        email = fake.email()
        product = fake.word().capitalize() + " Solution"
        writer.writerow([name, email, product])

print("Dummy dataset created!")