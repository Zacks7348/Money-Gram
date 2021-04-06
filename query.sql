-- ******************************************************************
-- Returns account_ids that have a relationship of type 
-- STATUS with ID.  
-- ******************************************************************
SELECT user2_id FROM relationship
    WHERE user1_id = ID AND status_id = STATUS
UNION
SELECT user1_id FROM relationship
    WHERE user2_id = ID AND status_id = STATUS;

-- ******************************************************************
-- Returns transactions where sender_id = ID or reciever_id = ID  
-- ******************************************************************

SELECT * FROM transaction
    WHERE sender_id = ID 
UNION
SELECT * FROM transaction
    WHERE reciever_id = ID 

-- ******************************************************************
-- Returns payment methods linked to ID
-- ******************************************************************
SELECT * FROM (moneygram_account 
JOIN payment_method
ON moneygram_account.account_id = payment_method.account_id)
WHERE moneygram_account.account_id = ID;