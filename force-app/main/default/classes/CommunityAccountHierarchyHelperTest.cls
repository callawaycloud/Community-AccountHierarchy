@IsTest
private class CommunityAccountHierarchyHelperTest {
  @TestSetup
  private static void makeData() {
    Account acc1 = new Account(Name = 'Account 1');
    Account acc2 = new Account(Name = 'Account 2');
    Account acc3 = new Account(Name = 'Account 3');
    insert new List<Account>{ acc1, acc2, acc3 };
  }

  @IsTest
  private static void getAccounts_null() {
    Exception ex;
    try {
      CommunityAccountHierarchyHelper.getAccounts(null);
    } catch (Exception e) {
      ex = e;
    }
    System.assertNotEquals(null, ex, 'Expected an exception to be thrown');
  }

  @IsTest
  private static void getAccounts_allRecords() {
    List<Account> accounts = CommunityAccountHierarchyHelper.getAccounts(1000);
    System.assertEquals(3, accounts.size(), 'Expected to get back 3 accounts');
  }

  @IsTest
  private static void getAccounts_someRecords() {
    List<Account> accounts = CommunityAccountHierarchyHelper.getAccounts(1);
    System.assertEquals(1, accounts.size(), 'Expected to get back 1 accounts');
  }
}
