import { describe, expect, test } from '@jest/globals';
import { computedColor } from '../utils/tasksArea.utils';
import { TASK, CAT } from '../api/apiSupabase';

describe('Task Area: computedColor', () => {
  const todo: TASK = {
    category: 'Ale',
    completed: false,
    created_at: '2022-10-13T14:27:07.000Z',
    id: 1,
    is_urgent: false,
    name: 'test',
    user: null
  }

  const categories: CAT[] = [
      {
        id: 404,
        created_at: "2024-05-10T23:35:18.230874+00:00",
        name: "Ale",
        color: "SlateBlue",
        icon: "icon-grin",
        user: "b9f5abe8-011d-4fa7-85cc-59a3b69733d3"
    }
  ]

  const emptyArray: CAT[] = []

  it('should return the category color', () => {
    expect(computedColor(todo, categories)).toBe('SlateBlue')
  })

  it('should return undefined if category and todo name are not equal', () => {
    expect(computedColor({ ...todo, category: 'Ale2' }, categories)).toBeUndefined()
  })

  it('should return undefined if receive an empty array', () => {
    expect(computedColor(todo , emptyArray)).toBeUndefined()
  })
})