

users = {}  

def register():
    print("\n--- User Registration ---")
    username = input("Enter a username: ")
    if username in users:
        print("❌ Username already exists! Try again.")
    else:
        password = input("Enter a password: ")
        users[username] = password
        print("✅ Registration successful!")

def login():
    print("\n--- User Login ---")
    username = input("Enter username: ")
    password = input("Enter password: ")
    
    if username in users and users[username] == password:
        print("✅ Login successful! Welcome,", username)
        secured_page(username)
    else:
        print("❌ Invalid username or password!")

def secured_page(username):
    print("\n🔒 --- Secured Page ---")
    print(f"Hello {username}, you have accessed the secured page!")
    print("This page is only visible after login.\n")

def main():
    while True:
        print("\n====== LOGIN SYSTEM ======")
        print("1. Register")
        print("2. Login")
        print("3. Exit")
        
        choice = input("Choose an option (1-3): ")
        
        if choice == "1":
            register()
        elif choice == "2":
            login()
        elif choice == "3":
            print("👋 Exiting the system. Goodbye!")
            break
        else:
            print("❌ Invalid choice! Please try again.")

if __name__ == "__main__":
    main()
