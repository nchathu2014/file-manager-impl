const helpInfo = [
    {'Command': 'up', 'Description': 'Go upper from current directory'},
    {'Command': 'cd', 'Description': 'Go to dedicated folder from current directory'},
    {'Command': 'ls', 'Description': 'Print in console list of all files and folders in current directory'},
    {'Command': 'cat path_to_file', 'Description': 'Read file and print its content in console'},
    {'Command': 'add new_file_name', 'Description': 'Create empty file in current working directory'},
    {'Command': 'rn path_to_file new_filename', 'Description': 'Rename file'},
    {'Command': 'cp path_to_file path_to_new_directory', 'Description': 'Copy file'},
    {'Command': 'mv path_to_file path_to_new_directory', 'Description': 'Move file'},
    {'Command': 'rm path_to_file', 'Description': 'Delete file'},
    {'Command': 'os --EOL', 'Description': 'Get EOL (default system End-Of-Line) and print it to console'},
    {'Command': 'os --cpus', 'Description': 'Get host machine CPUs info and print it to console'},
    {'Command': 'os --homedir', 'Description': 'Get home directory and print it to console'},
    {'Command': 'os --username', 'Description': 'Get current system user name and print it to console'},
    {'Command': 'os --architecture', 'Description': 'Get CPU architecture for which Node.js binary has compiled and print it to console'},
    {'Command': 'hash path_to_file', 'Description': 'Calculate hash for file and print it into console'},
    {'Command': 'compress path_to_file path_to_destination', 'Description': 'Compress file'},
    {'Command': 'decompress path_to_file path_to_destination', 'Description': 'Decompress file'},
    {'Command': '.exit', 'Description': 'Exit from the program'},
    {'Command': 'cmd + d (mac) or Ctrl + d (windows)', 'Description': 'Exit from the program'},
];

export const printHelp = () => {
    console.log('\nHelp Information:');
    console.table(helpInfo);
};

