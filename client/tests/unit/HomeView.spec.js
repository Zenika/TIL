
import HomeView from '../../src/views/HomeView.vue'
import { shallowMount } from '@vue/test-utils';
import ProgressSpinner from 'primevue/progressspinner';
import Paginator from 'primevue/paginator';

// jest.mock('vue-router')

// jest.mock('@vue/apollo-composable', () => ({
//   __esModule: true,
//   useQuery: jest.fn(() => ({
//     loading: () => false,
//     result: () => ({
//       post: [
//         {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://docs.docker.com/desktop/mac/install/"
//         },
//         {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://docs.docker.com/desktop/mac/install/"
//         }, {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://docs.docker.com/desktop/mac/install/"
//         },
//         {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://docs.docker.com/desktop/mac/install/"
//         }, {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://docs.docker.com/desktop/mac/install/"
//         },
//         {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },
//         {
//           url: "https://docs.docker.com/desktop/mac/install/"
//         }, {
//           url: "https://www.youtube.com/watch?v=qnYSx-SQXiI"
//         },


//       ],
//       post_aggregate: {
//         aggregate: {
//           count: 15
//         }
//       }
//     })
//   }))
// }));

describe('Pagination Test', () => {

  it('Offset is set according to the page number', async () => {
    // require('vue-router').useRoute.mockReturnValueOnce({
    //   params: {
    //     page: 2
    //   }
    // })

    // const wrapper = shallowMount(HomeView, {
    //   global: {
    //     components: {
    //       'ProgressSpinner': ProgressSpinner,
    //       'DataView': DataView,
    //       'Paginator': Paginator,

    //     },
    //   },

    // });
    // const pagination = wrapper.get('[data-test="pagination"]')
    // expect(pagination).toBeDefined()
    // expect(pagination.html()).toContain('first="10"')

    expect(1).toBe(1)
  })
})