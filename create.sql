-- ***************************************************
-- Create/recreate MoneyGram database
-- ***************************************************


-- ***************************************************
-- Drop all tables so that we can recreate them
-- ***************************************************
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS relationship;
DROP TABLE IF EXISTS status_enum;
DROP TABLE IF EXISTS bank_account;
DROP TABLE IF EXISTS payment_method;
DROP TABLE IF EXISTS moneygram_account;

-- ***************************************************
-- Create tables
-- ***************************************************

CREATE TABLE IF NOT EXISTS moneygram_account
(
    account_ID  uuid NOT NULL,
    username    text NOT NULL UNIQUE,
    email       text NOT NULL UNIQUE ,
    password    text NOT NULL,
    fname       text NOT NULL,
    mname       varchar(1),
    lname       text NOT NULL,
    DOB         text NOT NULL,
    phone       text NOT NULL UNIQUE, 
    balance     decimal DEFAULT 0.0,
    profile_url text,
    PRIMARY KEY (account_ID)
);

CREATE TABLE IF NOT EXISTS payment_method
(
    card_number     bigint  NOT NULL,
    name_on_card    text    NOT NULL,
    exp_date        text    NOT NULL,
    account_ID      uuid    NOT NULL,
    cvc             text    NOT NULL,
    FOREIGN KEY (account_ID) REFERENCES moneygram_account (account_ID)
);


CREATE TABLE IF NOT EXISTS bank_account
(
    bank_routing_number bigint  NOT NULL,
    bank_account_number bigint  NOT NULL,
    bank_name           text    NOT NULL,
    account_ID          uuid    NOT NULL,
    FOREIGN KEY (account_ID) REFERENCES moneygram_account (account_ID) 
);

CREATE TABLE IF NOT EXISTS status_enum
(
    status_ID       int     NOT NULL,
    description     text    NOT NULL,
    PRIMARY KEY (status_ID)
);

CREATE TABLE IF NOT EXISTS transaction
(
    transaction_ID  uuid    NOT NULL,
    amount          decimal NOT NULL,
    date            text    NOT NULL,
    time            text    NOT NULL,
    memo            text,
    sender_ID       uuid    NOT NULL,
    reciever_ID     uuid    NOT NULL,
    status_ID       int     NOT NULL,
    FOREIGN KEY (sender_ID) REFERENCES moneygram_account (account_ID),
    FOREIGN KEY (reciever_ID) REFERENCES moneygram_account (account_ID),
    FOREIGN KEY (status_ID) REFERENCES status_enum (status_ID)
);

CREATE TABLE IF NOT EXISTS relationship
(
    user1_ID        uuid    NOT NULL,
    user2_ID        uuid    NOT NULL,
    action_user_ID  uuid    NOT NULL,
    status_ID       int     NOT NULL,
    FOREIGN KEY (user1_ID) REFERENCES moneygram_account (account_ID),
    FOREIGN KEY (user2_ID) REFERENCES moneygram_account (account_ID),
    FOREIGN KEY (action_user_ID) REFERENCES moneygram_account (account_ID),
    FOREIGN KEY (status_ID) REFERENCES status_enum (status_ID)
);