create table custom_monsters (
  path character(25),
  name character(20),
  ownership_token uuid,
  json bytea,
  constraint custom_monsters_ux_path primary key (path)
);

create table users (
  email_address character(50),
  ownership_token uuid,
  constraint users_ux_email_address primary key (email_address)
);

