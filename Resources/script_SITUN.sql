CREATE TABLE TP(TP_1 varchar(30), TP_2 varchar(15), TP_3 varchar(15), TP_4 varchar (15),TP_5 varchar(30), CONSTRAINT pkTP PRIMARY KEY (TP_4));



CREATE TABLE TU
(
  TU_1 varchar(15),
  TU_2 varchar(15),
  TU_3 numeric(1),
  CONSTRAINT fkTU FOREIGN KEY (TU_1) REFERENCES TP (TP_4)
);


CREATE TABLE TC(
TC_1 SERIAL,
TC_2 DATE,
TC_3 TEXT,
TC_4 DATE,
TC_5 TEXT,
TC_6 TEXT, 
TC_7 TEXT,
TC_8 TEXT,
TC_9 VARCHAR(15),
TC_10 TEXT,
TC_11 TEXT,
TC_12 TEXT,
CONSTRAINT pkTC PRIMARY KEY(TC_1),
CONSTRAINT fkTC FOREIGN KEY (TC_9) REFERENCES TP (TP_4)
);



CREATE TABLE TE(
TE_1 INTEGER,
TE_2 INTEGER,
CONSTRAINT fkTE1 FOREIGN KEY (TE_1) REFERENCES TC (TC_1),
CONSTRAINT fkTE2 FOREIGN KEY (TE_2) REFERENCES TC (TC_1),
CONSTRAINT pkTE PRIMARY KEY (TE_1, TE_2)
);


CREATE TABLE TA(
TA_1 INTEGER,
TA_2 DATE,
TA_3 DATE,
TA_4 NUMERIC(1),
CONSTRAINT fkTA1 FOREIGN KEY (TA_1) REFERENCES TC (TC_1),
CONSTRAINT pkTA PRIMARY KEY (TA_1, TA_2)
);


insert into TP values ('Grettel','Castro','Cruz','111','algunCorreo@gmail.com');

insert into TU values ('111','123',1);



------------------------FUNCIONES--------------------------
---------------------CREAR POR SEPARADO--------------------
CREATE OR REPLACE FUNCTION post(xn integer) RETURNS void  AS
$BODY$
DECLARE
v_i integer;
BEGIN insert into x (select TE_2 from TE where TE_1=xn );
insert into b (select TE_2 from TE where TE_1=xn );
   FOR v_i IN select TE_2 from TE,x where TE.TE_1=x.a loop
       insert into x(select TE_2 from TE,x where TE.TE_1=x.a group by TE_2,a order by a);
       insert into b(select TE_2 from TE,x where TE.TE_1=x.a and xn<>TE.TE_1 group by TE_2,a order by a);
       end loop;  
END $BODY$ LANGUAGE 'plpgsql'

----------------------------------------------------------


CREATE OR REPLACE FUNCTION pre(xn integer) RETURNS void  AS
$BODY$
DECLARE
v_i integer;
BEGIN insert into x (select TE_1 from TE where TE_2=xn );
      insert into a (select TE_1 from TE where TE_2=xn );
   FOR v_i IN select TE_1 from TE,x where TE.TE_2=x.a loop
      insert into x(select TE_1 from TE,x where TE.TE_2=x.a group by a,TE_1 order by a);
      insert into a(select TE_1 from TE,x where TE.TE_2=x.a and xn<>TE.TE_1 group by a,TE_1 order by a);
       end loop; 
END $BODY$ LANGUAGE 'plpgsql'

---------------------------------------------------------

-------------------LLAMADO A FUNCIONES-------------------
CREATE OR REPLACE FUNCTION final(x integer) RETURNS void  AS
$BODY$
DECLARE 
BEGIN
drop table if exists x;
create temp table x(a integer);
drop table if exists a;
create temp table a(w integer);
drop table if exists b;
create temp table b(z integer);
perform post(x);
delete from x;
perform  pre(x);      
END $BODY$ LANGUAGE 'plpgsql'
--------------------------------------------------------
CREATE OR REPLACE FUNCTION Enlaces(x integer) RETURNS json AS   -- funcion a llamar
$BODY$
DECLARE 
BEGIN
perform final(x);
delete from x;
insert into x (select w*-1 from a group by w order by w);
insert into x(select * from b group by z order by z);
return array_to_json(array_agg(row_to_json(r))) from (select tc_1,tc_3,a from tc,x where tc_1=x.a or tc_1=x.a*-1  group by tc.tc_1,a order by tc_1) r;  
END $BODY$ LANGUAGE 'plpgsql'
------------
