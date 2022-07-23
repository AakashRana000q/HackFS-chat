import apolloClient from './apollo-client.js'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { isCommunityResourcable } from '@ethersproject/providers'

const GET_PROFILES = gql`
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
const getProfile = (address: string) => {
  const { data, loading, error } = useQuery(GET_PROFILES, {
    client: apolloClient,
    variables: { request: { ownedBy: [address], limit: 1 } },
    onCompleted(data) {
      console.log(1)
    },
  })
  let empty: string = ''
  let usern: string = data?.profiles?.items[0]?.handle
    ? String(data.profiles.items[0].handle)
    : empty
  return usern
}
export default getProfile
