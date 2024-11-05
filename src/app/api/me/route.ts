export async function GET(request: Request) {
  return Response.json({
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John Doe Testing',
    identity: undefined,
    image:
      'https://lh5.googleusercontent.com/proxy/_ZZA4fMLwp25NsYmTk2eWE1Vh-SwfgejIi7JZqC6kcnbIfIGwKaoxE5BeM7Ge8Yc2cMvciZJj6LSyQnLR2htgdZNQIMaoy-ED9f91Tb_mBYJl7Rxi8FOnEwFwTzot7NP3_cyLQsmMSmNPruRzqeWekvqjTqUIwcU8XnyVESOqS-4c0TR4cs',
  });
}

export async function PUT(request: Request) {
  return Response.json({}, { status: 201 });
}
