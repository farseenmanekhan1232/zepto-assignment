import React, { useEffect, useState } from "react";
import "./index.css";

// Define a type for User
type User = {
  username: string;
  email: string;
  image: string;
};

const App: React.FC = () => {
  // Mock list of users

  const mockUsers: User[] = [
    {
      username: "User1",
      email: "user1@example.com",
      image: "/icons/profile.svg",
    },
    {
      username: "User2",
      email: "user2@example.com",
      image: "/icons/profile.svg",
    },
    {
      username: "User3",
      email: "user3@example.com",
      image: "/icons/profile.svg",
    },
  ];

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const input = document.getElementById("search-field");

    input!.addEventListener("keydown", function (event) {
      const key = event.key;
      console.log(key);
      if (key === "Backspace") {
        if (!value) {
          console.log("popping");
          setSelectedUsers((prev) => {
            const newPrev = prev.slice(0, prev.length - 1);
            return [...newPrev];
          });
        }
      }
    });

    return input!.removeEventListener("keydown", function (event) {});
  }, []);

  // Filtered items logic: Exclude already selected users
  const filteredItems = mockUsers.filter(
    (user) =>
      value &&
      user.email.toLowerCase().includes(value.toLowerCase()) &&
      !selectedUsers.some((selectedUser) => selectedUser.email === user.email)
  );

  const handleSelectUser = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveUser = (email: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.email !== email));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center border min-w-72">
        {selectedUsers.map((user) => (
          <div
            className=" rounded-full flex items-center gap-2 bg-gray-100 px-2 py-0.5"
            key={user.email}
          >
            <img src={user.image} alt={user.username} className="w-5 h-5" />
            <div className="text-md font-medium">{user.username}</div>

            <button onClick={() => handleRemoveUser(user.email)}>
              <img src="/icons/remove.svg" alt="" className=" pl-3 w-10 h-10" />
            </button>
          </div>
        ))}

        <div className="relative">
          <input
            id="search-field"
            className="p-2 outline-none w-64"
            value={value}
            placeholder="Type or paste email addresses..."
            onChange={handleChange}
          />
          <div className="absolute bg-gray-200 rounded-md">
            {filteredItems.map((user) => (
              <div
                className="flex w-64 py-2  items-center gap-2 hover:cursor-pointer p-1"
                key={user.email}
                onClick={() => {
                  handleSelectUser(user);
                  setValue("");
                }}
              >
                <img src={user.image} alt={user.username} className="w-5 h-5" />
                <div className="text-md font-medium">{user.username}</div>
                <div className="text-md ">{user.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
