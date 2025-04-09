export const user_log_result = {
  ERROR: 'ERROR',
  INFO: 'INFO',
  WARNING: 'WARNING'
} as const;
export type user_log_result = keyof typeof user_log_result;

export const test_status = {
  todo: 'todo',
  running: 'running',
  review: 'review',
  done: 'done'
} as const;
export type test_status = keyof typeof test_status;

export const test_step_status = {
  ok: 'ok',
  fail: 'fail'
} as const;
export type test_step_status = keyof typeof test_step_status;

