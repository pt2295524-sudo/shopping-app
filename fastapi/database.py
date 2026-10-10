from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

# Select database
db = client["school_mgt"]

# Collections
users = db["users"]
otp_collection = db["otp"]