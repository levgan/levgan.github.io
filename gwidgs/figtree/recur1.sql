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


-- with recursive item_tree(id1, id2, lvl) AS ( select 2, 5, 0 union SELECT a.id1, a.id2, b.lvl+1 FROM itemitem a, item_tree b where a.id1 = b.id2 order by 3 desc ) select * from item_tree



