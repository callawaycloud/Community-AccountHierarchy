public with sharing class CommunityAccountHierarchyHelper {
  @AuraEnabled
  public static List<Account> getAccounts(Integer numberOfRecords) {
    try {
      return [
        SELECT Id, Name, ParentId
        FROM Account
        WITH SECURITY_ENFORCED
        ORDER BY Name ASC
        LIMIT :numberOfRecords
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
