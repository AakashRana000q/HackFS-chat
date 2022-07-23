import apolloClient from './apollo-client.js'
import { gql } from '@apollo/client'
import { useState } from 'react'
import { isCommunityResourcable } from '@ethersproject/providers'

const GET_PROFILES = `
  query Profiles($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
            type
          }
          ... on RevertFollowModuleSettings {
            type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`
const getProfile = async (address: string) => {
  const res = await apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request: {
        ownedBy: [address],
        limit: 1,
      },
    },
  })
  const empty: string = ''
  return res?.data?.profiles?.items[0]?.handle
    ? res.data.profiles.items[0].handle
    : empty
}

export default getProfile
