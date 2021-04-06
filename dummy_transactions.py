import random
import uuid
import pandas as pd
import datetime

INSERT = 'INSERT INTO transaction (transaction_id, amount, date, time, sender_id, reciever_id, status_id) VALUES '
VALUES = "\n\t('{id}', {amt}, '{date}', '{time}', '{sender}', '{reciever}', {status}),"

OUTPUT_FILE = 'dummy_transactions.sql'

ACCOUNTS_FILE = 'dummy_accounts.csv'

ACCOUNT_ROWS = pd.read_csv(ACCOUNTS_FILE)

ACCOUNT_IDS = ACCOUNT_ROWS['account_id']

def jonathon():
    query = INSERT
    now = datetime.datetime.now()
    jid = '3e346b9a-7d77-429b-a261-46ec15006033'
    for _ in range(10):
        amt = random.randint(0, 999)
        date = datetime.date.today()
        time = now.strftime("%H:%M:%S")
        r = random.randint(0, len(ACCOUNT_IDS)-1)
        reciever = ACCOUNT_IDS[r]
        while reciever == jid:
            # generate another random int if r == i
            r = random.randint(0, len(ACCOUNT_IDS)-1)
            reciever = ACCOUNT_IDS[r]
        r = random.randint(0, 100)
        if r < 30: #30% chance for status 0 (transaction pending)
            status_id = 0
        elif r < 95: # 65% chance for status 1 (transaction completed)
            status_id = 2
        else: # 5% chance for status 3 (blocked)
            status_id = 3
        query += VALUES.format(id=uuid.uuid1(), amt=amt, date=date, time=time, sender=jid, reciever=reciever, status=status_id)
    with open('jonathon.sql', 'w') as f:
        f.write(query[:-1]+';')


def insert_transaction():
    query = INSERT
    now = datetime.datetime.now()

    for i, row in ACCOUNT_ROWS.iterrows():
        sender = row['account_id']
        for _ in range(random.randint(0, 20)):
            amt = random.randint(0, 999)
            date = datetime.date.today()
            time = now.strftime("%H:%M:%S")
            r = random.randint(0, len(ACCOUNT_IDS)-1)
            while r == i:
                # generate another random int if r == i
                r = random.randint(0, len(ACCOUNT_IDS)-1)
            reciever = ACCOUNT_IDS[r]
            r = random.randint(0, 100)
            if r < 30: #30% chance for status 0 (transaction pending)
                status_id = 0
            elif r < 95: # 65% chance for status 1 (transaction completed)
                status_id = 2
            else: # 5% chance for status 3 (blocked)
                status_id = 3
            query += VALUES.format(id=uuid.uuid1(), amt=amt, date=date, time=time, sender=sender, reciever=reciever, status=status_id)
    with open(OUTPUT_FILE, 'w') as f:
        f.write(query[:-1]+';')
jonathon()