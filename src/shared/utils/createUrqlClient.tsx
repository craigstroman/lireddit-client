import { cacheExchange, Resolver, Cache } from '@urql/exchange-graphcache';
import { Client, fetchExchange, dedupExchange, Exchange, ClientOptions, gql } from 'urql';
import { pipe, tap } from 'wonka';
import { MeDocument } from '../../generated/graphql';
import { cursorPagination } from './cursorPagination';
import { betterUpdateQuery } from './betterUpdateQuery';

const debugExchange: Exchange =
  ({ forward }: any) =>
  (ops$: any) =>
    pipe(
      forward(ops$),
      tap((e) => console.log('[urql]', e)),
    );

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter((info) => info.fieldName === 'posts');
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'posts', fi.arguments || {});
  });
};
const ssrExchange: any;

export const createUrqlClient = (): ClientOptions => {
  return new Client({
    url: 'http://localhost:9000/graphql',
    fetchOptions: {
      credentials: 'include',
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: 'Post',
                id: (args as DeletePostMutationVariables).id,
              });
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as any,
              );

              if (data) {
                if (data.voteStatus === value) {
                  return;
                }
                const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value } as any,
                );
              }
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllPosts(cache);
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({
                me: null,
              }));
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                },
              );
              invalidateAllPosts(cache);
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                },
              );
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
      debugExchange,
    ],
  });
};
