import pandas as pd
import random

ACCOUNTS_FILE = 'accounts.csv'

INSERT = 'INSERT INTO relationship (user1_ID, user2_ID, action_user_ID)'

ACCOUNT_ROWS = pd.read_csv(ACCOUNTS_FILE)
print(ACCOUNT_ROWS)

