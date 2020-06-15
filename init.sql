create table custom_monsters (
  path character(25),
  name character(20),
  ownership_token uuid,
  json bytea,
  constraint custom_monsters_ux_path primary key (path)
);

