import {Selector, RequestMock} from "testcafe";
import mockUser from "../mocks/mockUser.json";

var apiMocks = RequestMock()
  .onRequestTo(/\/api.github.com\/users/)
  .respond(mockUser, 200, {
    'access-control-allow-credentials': "*",
    'access-control-allow-origin': "*"
  })
fixture `When a user is searched`
  .page(`http://localhost:3000/`)
  .requestHooks(apiMocks);

test("Should fetch user details", async t => {
  const spinnerEl = Selector("[data-test-id='spinner']");

  await t.expect(spinnerEl.exists).notOk();

  await t
    .typeText("[data-test-id='txt-search']", "foo")
    .click("[data-test-id='btn-search']");

  // await t.expect(spinnerEl.exists).ok();
  await t.expect(Selector("[data-test-id='username']").innerText).eql("Foo Bar");
  await t.expect(Selector("[data-test-id='userid']").innerText).eql("foo");
})