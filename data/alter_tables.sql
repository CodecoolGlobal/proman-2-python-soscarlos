ALTER TABLE ONLY statuses
    ADD     board_id    INTEGER;

ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_statuses_status_id FOREIGN KEY (board_id) REFERENCES boards(id);