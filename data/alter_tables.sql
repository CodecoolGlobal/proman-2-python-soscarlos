ALTER TABLE ONLY statuses
    ADD board_id INTEGER;

ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_statuses_status_id FOREIGN KEY (board_id)
        REFERENCES boards(id);

ALTER TABLE boards
    ADD COLUMN user_id integer;

ALTER TABLE boards
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id)
    REFERENCES users (id);