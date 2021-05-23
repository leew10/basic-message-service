import fetch from "node-fetch";

jest.setTimeout(10000);
it("Can invoke hello world", async () => {
    const uri = `${global.basePath}/hello`;
    const expected = {
        message: "Hello World!"
    };

    const response = await fetch(uri, {
        method: "GET"
    });

    expect(response.status).toEqual(200);
    const responseBody = await response.json();
    expect(responseBody).toMatchObject(expected);
});