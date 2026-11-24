import assert from 'node:assert/strict';
import test from 'node:test';

import { ProjectBoard } from '../src/domain/project-board.mjs';

test('unknown and mixed-case filters fall back to a known shelf', () => {
  assert.equal(ProjectBoard.normalizeFilter(null), 'ALL');
  assert.equal(ProjectBoard.normalizeFilter('enjoy'), 'Enjoy');
  assert.equal(ProjectBoard.normalizeFilter('nope'), 'ALL');
});

test('a card stays visible for ALL and its own category only', () => {
  assert.equal(ProjectBoard.shows('Study', 'ALL'), true);
  assert.equal(ProjectBoard.shows('Study', 'Study'), true);
  assert.equal(ProjectBoard.shows('Study', 'Create'), false);
});

test('images after the first row load lazily', () => {
  assert.equal(ProjectBoard.imageLoading(0), 'eager');
  assert.equal(ProjectBoard.imageLoading(4), 'lazy');
});
