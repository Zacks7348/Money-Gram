import random
import string
import bcrypt
import uuid

INSERT = 'INSERT INTO moneygram_account (account_id, username, password, fname, mname, lname, DOB, phone, email) VALUES '
VALUES = "\n\t('{id}', '{user}', '{password}', '{fname}', '{mname}', '{lname}', '{dob}', '{phone}', '{email}'),"
N = 500

OUTPUT_FILE = 'dummy_accounts.sql'
LOGINS_FILE = 'login.txt'
# ------------------------------------------------GENERATORS------------------------------------------------
def id_generator(num):
    return uuid.uuid4()

def card_num_generator(num):
    card_nums = [] #used in other tables
    ran = random.randint(1000000000, 9999999999)
    counter = num

    while counter > 0:
        if ran not in card_nums:
            card_nums.append(ran)
            counter -= 1
        else:
            ran = random.randint(1000000000, 9999999999)
    return card_nums

def month_year_generator():
    m = str(random.randint(1, 12))
    y = str(random.randint(21,50))
    return m + "/" + y

def day_month_year_generator():
    d = str(random.randint(1, 28))
    m = str(random.randint(1, 12))
    y = str(random.randint(21,50))
    return m + "/" + d + "/" + y
def dob_generator():
    d = str(random.randint(1, 28))
    m = str(random.randint(1, 12))
    y = str(random.randint(1900,2010))
    return m + "/" + d + "/" + y
def time_generator():
    h = str(random.randint(1, 24))
    m = str(random.randint(1, 60))
    s = str(random.randint(1, 60))
    return h + ":" + m + ":" + s

def balance_generator():
    luck = random.randint(0,10)

    if luck == 0:
        balance = round(random.uniform(0,50), 2)
    elif luck < 5:
        balance = round(random.uniform(0,5000), 2)
    elif luck < 7:
        balance = round(random.uniform(0,10000), 2)
    elif luck <= 9:
        balance = round(random.uniform(1000,100000), 2)
    else: #millionaire
        balance = round(random.uniform(100000, 1000000000000), 2)
    
    return balance

def password_generator(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


def insert_user():
    lower_upper_alphabet = string.ascii_letters
    fname_file = open("fname.txt","r")
    fname_lines = fname_file.readlines()
    lname_file = open("lname.txt","r")
    lname_lines = lname_file.readlines()
    user_name_file = open("userName.txt","r")
    user_name_lines = user_name_file.readlines()
    email_file = open("email.txt","r")
    email_lines = email_file.readlines()
    logins = []

    query = INSERT

    for i in range(N):
        print('[{}/{}]'.format(i+1, N))
        dob = str(dob_generator())
        phone = str(random.randint(1000000000, 9999999999))
        password = str(password_generator(10))
        hashed = bcrypt.hashpw(str.encode(password), bcrypt.gensalt(10)).decode('utf-8')
        middle_name = random.choice(lower_upper_alphabet).upper()
        user_name = user_name_lines[i].strip()
        fname = (fname_lines[i]).strip().lower().capitalize()
        lname = (lname_lines[i]).strip().lower().capitalize()
        email = (((email_lines[i]).strip()).lower())
        query += VALUES.format(id=uuid.uuid4(), user=user_name, password=hashed, 
                fname=fname, mname=middle_name, lname=lname, dob=dob, phone=phone,
                email=email)
        logins.append('username: {0:<20}\tpassword: {1:<10}\temail: {2:<20}\n'.format(user_name, password, email))
    with open(OUTPUT_FILE, 'w') as f:
        f.write(query[:-1]+';')
    with open(LOGINS_FILE, 'w') as f:
        f.writelines(logins)



