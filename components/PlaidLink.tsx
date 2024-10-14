import React, { useCallback } from 'react'
import { PlaidLinkProps } from '@/types'
import { Button } from './ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { exchangePublicToken } from '@/lib/actions/user.actions'


const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      // const data = await createLinkToken(user);
      // setToken(data?.linkToken)
    }

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token:string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user
      })
      router.push('/')
    }, [user, router]
  )  
  
  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
        <Button
          className='plaidlink-primary'
          onClick={() => { }}
          disabled={!ready}
        >
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
          <Button>
            Connect bank
          </Button>
        ) : (
            <Button>
              Connect Bank
            </Button>
      )
    }
    </>
  )
}

export default PlaidLink
