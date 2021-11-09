import Account from './account'

test('Account Instance Creation', () => {
  expect(() => new Account()).toThrow()
  expect(() => new Account({ title: "" })).toThrow("Missing title on Account creation")
  expect(() => new Account({ title: "Title" })).toThrow("Missing quota on Account creation")
  expect(() => new Account({ quota: 0 })).toThrow("Missing title on Account creation")
  expect(() => new Account({ quota: 0.5 })).toThrow("Missing title on Account creation")
  expect(() => new Account({ title: "", quota: 0 })).toThrow("Missing title on Account creation")
  expect(() => new Account({ title: "Title", quota: 0 })).toThrow("Missing quota on Account creation")
  const today = new Date().getTime()
  expect(new Account({ title: "Title", quota: 0.6 })).toEqual({ title: "Title", quota: 0.6, createdAt: today })
  expect(new Account({ title: "Title", quota: 0.6, createdAt: today })).toEqual({ title: "Title", quota: 0.6, createdAt: today })
})