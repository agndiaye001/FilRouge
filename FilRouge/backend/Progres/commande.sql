Docker 

PS C:\Users\agndiaye\Documents\GitHub\fill-rouge\backend> docker ps
CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS           
         NAMES
cbdfe456abe5   backend-backend   "/app/django.sh"         5 minutes ago    Up 5 minutes    0.0.0.0:8000->8000/tcp   backend
b8b41c65217f   postgres:16       "docker-entrypoint.s…"   34 minutes ago   Up 34 minutes   0.0.0.0:5432->5432/tcp   db
PS C:\Users\agndiaye\Documents\GitHub\fill-rouge\backend> docker exec -it b8b41c65217f /bin/bash 
root@b8b41c65217f:/# psql -U postgres -d db_community
psql (16.6 (Debian 16.6-1.pgdg120+1))
Type "help" for help.

db_community=# \dt

db_community=# \d backend_subscription
DELETE FROM "Users" WHERE "username" = 'user4';


PS C:\Users\agndiaye\Documents\GitHub\fill-rouge\backend> docker exec -it e8f84e2b2dda /bin/bash
root@e8f84e2b2dda:/
apt-get update
apt-get install -y locales
locale-gen en_US.UTF-8




Linux
agn@agn-VirtualBox:~/Bureau/ProjetFilRouge$ sudo -i -u postgres
postgres@agn-VirtualBox:~$ psql
postgres-# \c
postgres-# \c worktheque 
You are now connected to database "worktheque" as user "postgres".
worktheque-# \l
worktheque-# \dt
            List of relations
 Schema |     Name     | Type  |  Owner   
--------+--------------+-------+----------
 public | Admin        | table | postgres
 public | Subscription | table | postgres
 public | User         | table | postgres
 public | visitor      | table | postgres
(4 rows)



Lister les function :
SELECT routine_name
FROM information_schema.routines
WHERE routine_type = 'FUNCTION'
  AND specific_schema = 'public'; 
-----------------------------------------
 update_workspace_availability_on_delete
 add_user
 update_user
 add_reservation
 delete_user
(5 rows)






