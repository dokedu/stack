package graph_test

import (
	"github.com/dokedu/stack/backend/internal/msg"
	"github.com/jackc/pgx/v5"
)

func (ts *TestSuite) Test_Me() {
	// nil when no token is provided
	me, err := ts.Resolver.Query().Me(ts.Ctx())
	ts.NoError(err)
	ts.Nil(me)

	// info when user is logged in
	me, err = ts.Resolver.Query().Me(ts.CtxWithEmail("max@dokedu.org"))
	ts.NoError(err)
	ts.Equal("max@dokedu.org", me.Email)
}

func (ts *TestSuite) Test_User() {
	user1 := ts.UserByEmail("max@dokedu.org")
	user3 := ts.MockAdminForOrganisation(user1.OrganisationID)
	_, user2 := ts.MockOrganisationWithOwner()

	// err ErrUnauthenticated when not logged in
	user, err := ts.Resolver.Query().User(ts.Ctx(), user1.ID)
	ts.ErrorIs(err, msg.ErrUnauthenticated)
	ts.Nil(user)

	// err noRows when user does not exist
	user, err = ts.Resolver.Query().User(ts.CtxWithEmail(user1.Email), "1234")
	ts.ErrorIs(err, pgx.ErrNoRows)
	ts.Nil(user)

	// err noRows when user is not part of the same organisation
	user, err = ts.Resolver.Query().User(ts.CtxWithEmail(user1.Email), user2.ID)
	ts.ErrorIs(err, pgx.ErrNoRows)
	ts.Nil(user)

	// info when user is part of the same organisation
	user, err = ts.Resolver.Query().User(ts.CtxWithEmail(user1.Email), user3.ID)
	ts.NoError(err)
	ts.Equal(user3.ID, user.ID)
}
