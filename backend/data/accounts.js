const accounts=[];

export function addAccount(accountData){
    const account={
        user: accountData.user,
        email: accountData.email,
        pass: accountData.pass
    };

    accounts.push(account);

    return account;
}

export function findAccountByEmail(email){
    return accounts.find(account=>account.email===email);
}

export function checkLogin(user,pass) {
    return accounts.find(
        account=>
            account.user === user &&
            account.pass === pass
    );
}

export function getA()
{
    return accounts;
}