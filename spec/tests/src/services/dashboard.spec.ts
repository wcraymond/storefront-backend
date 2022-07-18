import { DashboardQueries } from "../../../../src/services/dashboard";
import { DatabaseTestHelper } from "../../../helpers/databaseTestHelper";

const dashboardQueries = new DashboardQueries();
const database = new DatabaseTestHelper();

describe('Dashboard queries', () => {
  beforeAll(async () => {
    await database.addTestUsers();
    await database.addTestProducts();
    await database.addTestOrders();
    await database.addTestOrderProducts();
  })

  it('should have a topFiveProducts method', () => {
    expect(dashboardQueries.topFiveProducts).toBeDefined();
  });

  it('should have a currentOrdersByUser method', () => {
    expect(dashboardQueries.currentOrdersByUser).toBeDefined();
  });

  it('should have a completedOrdersByUser method', () => {
    expect(dashboardQueries.completedOrdersByUser).toBeDefined();
  });

  it('topFiveProducts should return the top five products by order quantity', async () => {
    const result = await dashboardQueries.topFiveProducts();
    expect(result).toEqual([
      {
        id: 105,
        name: 'Product #5',
        price: 10,
        category: 'Old Products'
      },
      {
        id: 104,
        name: 'Product #4',
        price: 10,
        category: 'Old Products'
      },
      {
        id: 103,
        name: 'Product #3',
        price: 10,
        category: 'New Products'
      },
      {
        id: 102,
        name: 'Product #2',
        price: 10,
        category: 'New Products'
      },
      {
        id: 101,
        name: 'Product #1',
        price: 10,
        category: 'New Products'
      }
    ]);
  });

  it('currentOrdersByUser should return incomplete orders for given user', async () => {
    const result = await dashboardQueries.currentOrdersByUser('101');
    expect(result).toEqual([
      {
        id: 104,
        status: 'Processing',
        user_id: 101
      },
      {
        id: 105,
        status: 'Processing',
        user_id: 101
      }
    ]);
  });

  it('completedOrdersByUser should return completed orders for given user', async () => {
    const result = await dashboardQueries.completedOrdersByUser('101');
    expect(result).toEqual([
      {
        id: 101,
        status: 'Completed',
        user_id: 101
      },
      {
        id: 102,
        status: 'Completed',
        user_id: 101
      },
      {
        id: 103,
        status: 'Completed',
        user_id: 101
      }
    ]);
  });
});