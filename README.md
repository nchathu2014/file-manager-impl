# File Manager 🗂️
- Use 22.x.x version (22.15.0 or upper) of Node.js
- Please checkout to the 'development' branch
- npm run start -- --username=<YOUR_USER_NAME>
- If you are using yarn, yarn start --username=<YOUR_USER_NAME>
- If you install everyting correctly, you will see
<img width="394" alt="image" src="https://github.com/user-attachments/assets/df762ea2-0efa-4485-90ce-ee2813cf16c2" />

- If you want to see command help run fm --help on the console (additional development)
<img width="1045" alt="image" src="https://github.com/user-attachments/assets/e03ab504-3b08-4b12-90f9-ed04752cc114" />





# Help Information:

- up - Go upper from current directory;
- cd - Go to dedicated folder from current directory;
- ls - Print in console list of all files and folders in current directory.

- cat path_to_file - Read file and print it's content in console;
- add new_file_name - Create empty file in current working directory;
- rn path_to_file new_filename - Rename file;
- cp path_to_file path_to_new_directory - Copy file;
- mv path_to_file path_to_new_directory - Move file;
- rm path_to_file - Delete file;

- os --EOL - Get EOL (default system End-Of-Line) and print it to console;
- os --cpus - Get host machine CPUs info and print it to console;
- os --homedir - Get home directory and print it to console;
- os --username - Get current system user name and print it to console;
- os --architecture - Get CPU architecture for which Node.js binary has compiled and print it to console;

- hash path_to_file - Calculate hash for file and print it into console;

- compress path_to_file path_to_destination - Compress file;
- decompress path_to_file path_to_destination - Decompress file;
