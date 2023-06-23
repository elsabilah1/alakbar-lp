import { create } from "zustand"

import createActivitySlice, { IActivityState } from "./slices/activitySlice"
import createAdminSlice, { IAdminState } from "./slices/adminSlice"
import createChildSlice, { IChildState } from "./slices/childSlice"
import createDonationSlice, { IDonationState } from "./slices/donationSlice"
import createProfileSlice, { IProfileState } from "./slices/profileSlice"

const useStore = create<
  IAdminState & IChildState & IDonationState & IActivityState & IProfileState
>()((...a) => ({
  ...createAdminSlice(...a),
  ...createChildSlice(...a),
  ...createDonationSlice(...a),
  ...createActivitySlice(...a),
  ...createProfileSlice(...a),
}))

export default useStore
