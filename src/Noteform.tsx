import { FormEvent, useRef, useState } from "react";
import { Col, Row, Form, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteDate, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFromProps = {
  onSubmit: (data: NoteDate) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function Noteform({ onSubmit, availableTags, onAddTag }: NoteFromProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const subtitleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      subtitle: subtitleRef.current!.value,
      date: dateRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label };
                    onAddTag(newTag);
                    setSelectedTags((prev) => [...prev, newTag]);
                  }}
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="subtitle">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control ref={subtitleRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control ref={dateRef} type="Date" required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control ref={markdownRef} as="textarea" rows={13} required />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
