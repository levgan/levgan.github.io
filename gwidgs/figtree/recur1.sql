with recursive item_tree(id1, id2) AS (
    values(null, 1)
    union
    SELECT 
        a.tsk1, a.tsk2
    FROM 
        tsk_tsk a, item_tree b
    where a.tsk1 = b.id2
)
select * from item_tree
