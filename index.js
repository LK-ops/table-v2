document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");

  // Fetch todos and users data
  Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/users")
  ])
  .then(([todosResponse, usersResponse]) => {
      const todos = todosResponse.data;
      const users = usersResponse.data;

      // Limit the number of rows to 20 for demonstration
      const maxRows = 20;

      // Keep track of added user IDs to avoid duplicate rows
      const addedUserIds = new Set();
      let rowsAdded = 0;

      // Populate the table
      todos.forEach((todo) => {
          if (rowsAdded >= maxRows) return; // Stop if we've reached 20 unique rows

          const user = users.find(user => user.id === todo.userId);

          if (user && !addedUserIds.has(user.id)) {
              const row = document.createElement("tr");

              row.innerHTML = `
                  <td><input type="checkbox"></td>
                  <td><img src="Rectangle 79.svg" alt="Profile" class="profile-img"></td>
                  <td>${todo.title}</td>
                  <td>${user.email}</td>
                  <td>${user.address.street}, ${user.address.city}</td>
                  <td>${user.address.zipcode}</td>
                  <td>
                      <span class="status ${todo.completed ? 'completed' : 'not-completed'}">
                          ${todo.completed ? 'Completed' : 'Not Completed'}
                      </span>
                  </td>
                  <td><button class="action-btn">...</button></td>
              `;

              tableBody.appendChild(row);
              addedUserIds.add(user.id); // Mark this user ID as added
              rowsAdded++; // Increment the count of unique rows added
          }
      });
  })
  .catch(error => {
      console.error("Error fetching data:", error);
  });
});
