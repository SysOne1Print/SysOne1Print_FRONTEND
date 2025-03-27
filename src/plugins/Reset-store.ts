/* eslint-disable @typescript-eslint/no-explicit-any */
import cloneDeep from 'lodash.clonedeep'

export default function resetStore({ store }: { store: any }) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}
