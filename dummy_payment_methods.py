import random

import pandas as pd

INSERT = 'INSERT INTO payment_method (card_number, name_on_card, account_id, exp_date, cvc) VALUES '
VALUES = "\n\t({card_num}, '{name}', '{id}', '{exp_date}', '{cvc}'),"

OUTPUT_FILE = 'dummy_payment_methods.sql'

ACCOUNTS_FILE = 'dummy_accounts.csv'

ACCOUNT_ROWS = pd.read_csv(ACCOUNTS_FILE)

def card_num_generator():
    return random.randint(1000000000, 9999999999)

def month_year_generator():
    m = random.randint(1, 12)
    y = random.randint(21,50)
    return '{:02d}/{}'.format(m, y)

def cvc_generator():
    return '{:03d}'.format(random.randint(0, 999))

def insert_payment_methods():
    query = INSERT
    for i, row in ACCOUNT_ROWS.iterrows():
        account_id = row['account_id']
        name = '{} {} {}'.format(row['fname'], row['mname'], row['lname'])
        for _ in range(random.randint(1, 2)):
            exp_date = month_year_generator()
            cvc = cvc_generator()
            card_num = card_num_generator()
            query += VALUES.format(card_num=card_num, name=name, id=account_id, exp_date = exp_date, cvc=cvc)
    with open(OUTPUT_FILE, 'w') as f:
        f.write(query[:-1]+';')

insert_payment_methods()
