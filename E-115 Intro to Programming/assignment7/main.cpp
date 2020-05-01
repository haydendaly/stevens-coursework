// I pledge my honor that I have abided by the Stevens Honor System. - Hayden C. Daly

//Sources:
//https://www.youtube.com/watch?v=Iho2EdJgusQ used to grasp a basic understanding of the <fstream> library
//http://www.cplusplus.com/reference/fstream/fstream/ used to learn different functions I can use under the library of <fstream>
//https://www.tutorialspoint.com/Difference-between-private-public-and-protected-modifiers-in-Cplusplus used to understand the differences between public, private and protected variables in classes.

#include <iostream>
#include <string>
#include <fstream> //for the username database
using namespace std;

class ATM {
private:
    float balance;
    string name, name1, phoneNumber, password, password1, passwordMasked, adminPassword; //different passwords for different instances
    string passwordMasking(); //universally used string to be referenced everytime a password is typed in
    void depositCash(float money);
    void depositCheck(float money);
    void withdrawCash(float money);
    void checkBalance();
    void desiredFunction(int function);
    void createAccount();
    void changePassword();
    void returnToMenu();
    void mainMenu();
    void login();
    void displayAccount();
    void adminPortal();
    
public:
    void loginScreen();
    
}; //end of the ATM class

void ATM::depositCash(float money) {
    if(money <= 100; balance >= money) {
        balance = balance + money;
        cout << "New balance is $" << balance << endl;
        
        ofstream outFile;
        outFile.open("account"+phoneNumber+".txt"); //opens text file with accounts
        
        if (outFile.fail()) { //to check for errors
            cerr << "Error: File Corrupt" << endl;
            exit(1);
        }
        
        outFile << phoneNumber << " " << name << " " << password << " " << balance << " " << endl;
        outFile.close();
        returnToMenu();
    }
    else {
        cout << "Error: Cash deposits cannot exceed $100" << endl;
    }
}

void ATM::depositCheck(float money) {
    balance = balance + money;
    cout << "New balance is $" << balance << endl << endl;
    
    ofstream outFile;
    outFile.open("account"+phoneNumber+".txt"); //opens text file with accounts
    
    if (outFile.fail()) { //to check for errors
        cerr << "Error: File Corrupt" << endl;
        exit(1);
    }
    
    outFile << phoneNumber << " " << name << " " << password << " " << balance << " " << endl;
    outFile.close();
    returnToMenu();
    
}

void ATM::withdrawCash(float money) {
    if((float)balance < (float)money) {
        cout << "Error: Insufficient Funds" << endl << "Current balance is only $" << balance << "." << endl;
    }
    else {
        if(money <= 200) {
            if((int)money % 20 == 0) {
                balance = balance - money;
                cout << "New balance is $" << balance << endl << endl;
                
                ofstream outFile;
                outFile.open("account"+phoneNumber+".txt"); //opens text file with accounts
                
                if (outFile.fail()) { //to check for errors
                    cerr << "Error: File Corrupt" << endl;
                    exit(1);
                }
                
                outFile << phoneNumber << " " << name << " " << password << " " << balance << " " << endl;
                outFile.close();
                
                returnToMenu();
            }
            else {
                cout << "Error: Must be in increments of $20" << endl;
            }
        }
        else {
            cout << "Error: Withdraw Maximum is $200" << endl;
        }
    }
}

void ATM::checkBalance() {
    cout << "Your balance is $" << balance << endl;
}

void ATM::desiredFunction(int function) {
    float money = 0;
    
    if(function == 1) {
        
        int decision2; //decision1 is used for the initial login sequence
        cout << "Would you like to deposit cash or a check?" << endl << "     Enter 1 for Cash" << endl << "     Enter 2 for a Check" << endl << endl;
        cin >> decision2;
        
        if(decision2 == 1) {
            cout << "Insert Cash" << endl;
            cin >> money;
            depositCash(money);
        }
        
        if(decision2 == 2) {
            cout << "Insert Check" << endl;
            cin >> money;
            depositCheck(money);
        }
        
    }
    
    if(function == 2) {
        cout << "How much money would you like?" << endl;
        cin >> money;
        withdrawCash(money);
    }
    
    if(function == 3) {
        checkBalance();
    }
    
    if(function == 4) {
        changePassword();
    }
    
    if(function >= 5) {
        loginScreen();
    }
    
}

string ATM::passwordMasking() //universally used string to be referenced everytime a password is typed in
{
    cout << "Enter your password:" << endl;
    cin >> passwordMasked;
    cout << endl;
    return passwordMasked;
}

void ATM::createAccount()
{
    ATM ac;
    cout << endl << "Enter your phone number:" << endl;
    cin >> phoneNumber;
    ofstream outFile;
    outFile.open("account"+phoneNumber+".txt"); //opens text file with accounts
    
    if (outFile.fail()) { //to check for errors
        cerr << "Error: File Corrupt" << endl;
        exit(1);
    }
    
    cout << endl << "Enter your name:(NoSpaces)" << endl; //spaces will confuse the compiler and make it think that the name is the password
    cin >> name;
    cout << endl;
    outFile << name << " ";
    
    password = ac.passwordMasking();
    outFile << password << " ";
    
    cout << "Enter an initial amount: " << endl;
    cin >> balance;
    outFile << balance << " " << endl;
    
    cout << endl << "Account Created....." << endl;
    outFile.close();
    mainMenu();
}

void ATM::changePassword() {
    passwordMasking();
    if(!name.compare(name1))
    {
        if(!password.compare(passwordMasked))
        {
            cout << "New: ";
            password = passwordMasking();
            
            ofstream outFile;
            outFile.open("account"+phoneNumber+".txt"); //opens text file with accounts
            
            if (outFile.fail()) { //to check for errors
                cerr << "Error: File Corrupt" << endl;
                exit(1);
            }
            
            outFile << phoneNumber << " " << name << " " << password << " " << balance << " " << endl;
            outFile.close();
            
            cout << "Your password has been changed." << endl;
            returnToMenu();
            
        }
        else
        {
            cout << endl << "Incorrect password, please try again." << endl;
            return;
        }
    }
}

void ATM::login() {
    
    ifstream inFile;
    
    cout << endl << "Enter your phone number:" << endl;
    cin >> phoneNumber;
    
    inFile.open("account"+phoneNumber+".txt");
    
    if (inFile.fail()) { //to check for errors
        cerr << "Error: File Corrupt" << endl;
        exit(1);
    }
    
    inFile >> name >> password >> balance;
    
    cout << endl << "What is your name:" << endl;
    cin >> name1;
    cout << endl;
    
    passwordMasking();
    
    if(!name.compare(name1))
    {
        if(!password.compare(passwordMasked))
        {
            cout << endl << "You are being logged in!" << endl;
            mainMenu();
        }
        else
        {
            cout << endl << "Incorrect password, please try again." << endl;
            return;
        }
    }
    else
    {
        cout << endl << "Incorrect name, please try again." << endl;
        return;
    }
}

void ATM::displayAccount() {
    
    ifstream inFile;
    cout << "What is the phone number?" << endl;
    cin >> phoneNumber;
    
    inFile.open("account"+phoneNumber+".txt");
    
    if (inFile.fail()) { //to check for errors
        cerr << "Error: File Corrupt" << endl;
        exit(1);
    }
    inFile >> phoneNumber >> name >> password >> balance;
    
    cout << "======================================================" << endl;
    cout << "|| Phone #  ||   " << phoneNumber << endl;
    cout << "|| Name     ||   " << name << endl;
    cout << "|| Password ||   " << password << endl;
    cout << "|| Balance  ||   " << balance << endl;
    cout << "======================================================" << endl;
    
    inFile.close();
    returnToMenu();
    
}

void ATM::adminPortal() {
    cout << endl << "What is the admin password:" << endl;
    adminPassword = "MukundIsGreat";
    passwordMasking();
    
    if(!adminPassword.compare(passwordMasked)) //checking to see if they inputted the right password
    {
        cout << endl << "You are being logged in!" << endl;
        displayAccount();
    }
    else
    {
        cout << "Incorrect password" << endl << endl;
        return;
    }
    
}

void ATM::returnToMenu() {
    
    int decision3 = 1;
    cout << endl << "Enter 0 to Return to Menu" << endl << endl;
    cin >> decision3;
    if (decision3 != 1) {
        return;
        }
    }

void ATM::mainMenu() {
    
    int function = 0;
    
    while (function <= 5) {
        cout << endl << "What function do you desire?" << endl << "     Enter 1 to Deposit" << endl << "     Enter 2 to Withdraw" << endl << "     Enter 3 to Check Balance" << endl << "     Enter 4 to Change Password" << endl << "     Enter 5 to Exit" << endl << endl;
        cin >> function;
        cout << endl;
        desiredFunction(function); //made void function for the actual functions to make it not as congested
    }
}

void ATM::loginScreen() //instead of using main, this allows me to utilize a while loop and terminate it whenever.
{
    int decision1 = -1;
    while (decision1 <= 2) {
        
        cout << "======================================================" << endl << " Welcome to Hayden Bank! What would you like to do? " << endl << "                                                    " << endl << "     Enter 0 to Access Admin Information            " << endl << "     Enter 1 to Login                               " << endl << "     Enter 2 to Register                            " << endl << "     Enter 3 to Exit                                " << endl << "                                                    " << endl << "======================================================" << endl; //spaces for formatting
        cin >> decision1;
        
        if(decision1 == 0) {
            adminPortal();
        }
        
        if(decision1 == 1) {
            login();
        }
        
        if(decision1 == 2) {
            createAccount();
        }
        
        if(decision1 == 3) {
            cout << endl << "     *ATM Powers Off*" << endl;
        }
    }
}

int main() {
    ATM ac;
    cout << "     *ATM Powers On*" << endl << endl;
    ac.loginScreen(); //leads to void function portal, only member of the ATM class that is not private
}
