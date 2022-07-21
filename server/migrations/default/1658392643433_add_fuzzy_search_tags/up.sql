CREATE FUNCTION search_tags(search text) 
returns setof tag AS $$ 
SELECT   * 
FROM     tag 
WHERE    search <% ( name ) 
ORDER BY similarity(search, ( name )) DESC limit 5; 

$$ language sql stable;
