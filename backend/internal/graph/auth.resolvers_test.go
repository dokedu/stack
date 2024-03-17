package graph_test

import (
	"github.com/dokedu/stack/backend/internal/graph/model"
	"github.com/dokedu/stack/backend/internal/msg"
)

func (ts *TestSuite) Test_SignIn() {
	login := func(email, password string) (*model.SignInPayload, error) {
		return ts.Resolver.Mutation().SignIn(ts.Ctx(), model.SignInInput{
			Email:    email,
			Password: password,
		})
	}

	// trying to log in with invalid credentials should return an error
	_, err := login("invalid", "invalid")
	ts.ErrorIs(err, msg.ErrInvalidEmailOrPassword)

	_, err = login("max@dokedu.org", "invalid")
	ts.ErrorIs(err, msg.ErrInvalidEmailOrPassword)

	// trying to log in with valid credentials should return a token
	res, err := login("max@dokedu.org", "password")
	ts.NoError(err)
	ts.NotEmpty(res.Token)
	ts.Equal("max@dokedu.org", res.User.Email)

	// the token should now be in the db
	cnt, err := ts.DB.GLOBAL_SessionCountByToken(ts.Ctx(), res.Token)
	ts.NoError(err)
	ts.Equal(1, int(cnt))

	// the token can be used to get information about `me`
	me, err := ts.Resolver.Query().Me(ts.CtxWithToken(res.Token))
	ts.NoError(err)
	ts.Equal("max@dokedu.org", me.Email)
}
