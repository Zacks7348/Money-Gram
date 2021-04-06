import random

import pandas as pd

INSERT = 'INSERT INTO relationship (user1_id, user2_id, action_user_id, status_id) VALUES '
VALUES = "\n\t('{id1}', '{id2}', '{action_id}', {status_id}),"

OUTPUT_FILE = 'dummy_relationships.sql'

ACCOUNTS_FILE = 'accounts.csv'

ACCOUNT_ROWS = pd.read_csv(ACCOUNTS_FILE)

ACCOUNT_IDS = ACCOUNT_ROWS['account_id']

def insert_relationship():
    query = INSERT
    relationships = []

    def rel_exists(id1, id2):
        for rel in relationships:
            if id1 in rel and id2 in rel:
                return True
        return False

    for i, row in ACCOUNT_ROWS.iterrows():
        id1 = row['account_id']
        for j in range(random.randint(0, 20)): # generate 0-20 relationships for each account
            r = random.randint(0, len(ACCOUNT_IDS)-1)
            while r == i or rel_exists(id1, id2 := ACCOUNT_IDS[r]):
                # generate another random int if r == i or
                # relationship already exists between i and r
                r = random.randint(0, len(ACCOUNT_IDS)-1)
            assert(id1 != id2)
            action_id = random.choice([id1, id2])
            r = random.randint(0, 100)
            if r < 30: #30% chance for status 0 (friend request pending)
                status_id = 0
            elif r < 95: # 65% chance for status 1 (accept friend request)
                status_id = 1
            else: # 5% chance for status 3 (blocked)
                status_id = 3
            query += VALUES.format(id1=id1, id2=id2, action_id=action_id, status_id=status_id)
            relationships.append((id1, id2))
            print('[{}/{} ({})] Relationship generated'.format(i+1, len(ACCOUNT_IDS), j))
    with open(OUTPUT_FILE, 'w') as f:
        f.write(query[:-1]+';')    
insert_relationship()