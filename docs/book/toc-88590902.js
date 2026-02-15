// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="index.html">Home</a></span></li><li class="chapter-item "><li class="part-title">src</li></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/asset/index.html">❱ asset</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/asset/AssetBackingLedger.sol/contract.AssetBackingLedger.html">AssetBackingLedger</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/asset/MintController.sol/contract.AOXCMintController.html">AOXCMintController</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/asset/RedeemController.sol/contract.AOXCRedeemController.html">AOXCRedeemController</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/compliance/index.html">❱ compliance</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/compliance/ComplianceRegistry.sol/contract.AOXCComplianceRegistry.html">AOXCComplianceRegistry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/compliance/IdentityRegistry.sol/contract.AOXCIdentityRegistry.html">AOXCIdentityRegistry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/compliance/JurisdictionRegistry.sol/contract.AOXCJurisdictionRegistry.html">AOXCJurisdictionRegistry</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/index.html">❱ control</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/governance/index.html">❱ governance</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/governance/AOXCGovernor.sol/contract.AOXCGovernor.html">AOXCGovernor</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/governance/AOXCLockManager.sol/contract.AOXCLockManager.html">AOXCLockManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/governance/AOXCTimelock.sol/contract.AOXCTimelock.html">AOXCTimelock</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/roles/index.html">❱ roles</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/roles/ReputationManager.sol/contract.ReputationManager.html">ReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/control/roles/RoleAuthority.sol/contract.RoleAuthority.html">RoleAuthority</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/index.html">❱ core</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/token/index.html">❱ token</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/token/AOXCHonorSBT.sol/contract.AOXCHonorSBT.html">AOXCHonorSBT</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/token/AOXP.sol/contract.AOXP.html">AOXP</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/ANDROMEDA_CORE.sol/contract.ANDROMEDA_CORE.html">ANDROMEDA_CORE</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/AOXC.sol/contract.AOXC.html">AOXC</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/AOXCAccessCoordinator.sol/contract.AOXCAccessCoordinator.html">AOXCAccessCoordinator</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/AOXCHub.sol/interface.IVersion.html">IVersion</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/AOXCHub.sol/contract.AOXCHub.html">AOXCHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/AOXCStorage.sol/library.AOXCStorage.html">AOXCStorage</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/core/AOXCUpgradeAuthorizer.sol/contract.AOXCUpgradeAuthorizer.html">AOXCUpgradeAuthorizer</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/crypto/index.html">❱ crypto</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/crypto/SignatureVerifier.sol/library.SignatureVerifier.html">SignatureVerifier</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/errors/index.html">❱ errors</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/errors/AOXCErrorRegistry.sol/library.AOXCErrorRegistry.html">AOXCErrorRegistry</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/index.html">❱ execution</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/index.html">❱ asset</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/error.RankInsufficient.html">RankInsufficient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/error.DepartmentLocked.html">DepartmentLocked</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/error.QuotaExceeded.html">QuotaExceeded</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/error.ZeroAddressDetected.html">ZeroAddressDetected</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/interface.IReputationManager.html">IReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/interface.IMonitoringHub.html">IMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/contract.VirgoToken.html">VirgoToken</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/asset/VIRGO_FABRICATOR.sol/contract.VirgoFabricator.html">VirgoFabricator</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/index.html">❱ swap</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/error.RankInsufficient.html">RankInsufficient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/error.ZeroAddressDetected.html">ZeroAddressDetected</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/error.MarketAlreadyHalted.html">MarketAlreadyHalted</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/error.InsufficientLiquidity.html">InsufficientLiquidity</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/interface.IReputationManager.html">IReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/interface.IMonitoringHub.html">IMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/contract.AquilaToken.html">AquilaToken</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/execution/swap/AQUILA_EXCHANGE.sol/contract.AquilaExchange.html">AquilaExchange</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/index.html">❱ infrastructure</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/AOXCSwap.sol/interface.ITreasury.html">ITreasury</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/AOXCSwap.sol/interface.IPyth.html">IPyth</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/AOXCSwap.sol/contract.AOXCSwap.html">AOXCSwap</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/BridgeAdapter.sol/contract.AOXCBridgeAdapter.html">AOXCBridgeAdapter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/PriceOracleAdapter.sol/interface.IAggregatorV3.html">IAggregatorV3</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/PriceOracleAdapter.sol/contract.PriceOracleAdapter.html">PriceOracleAdapter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/RelayerGateway.sol/contract.AOXCRelayerGateway.html">AOXCRelayerGateway</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/infrastructure/Treasury.sol/contract.Treasury.html">Treasury</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/index.html">❱ integration</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/index.html">❱ bridge</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/CENTAURUS_BRIDGE.sol/error.RankInsufficient.html">RankInsufficient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/CENTAURUS_BRIDGE.sol/error.ZeroAddressDetected.html">ZeroAddressDetected</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/CENTAURUS_BRIDGE.sol/error.RouteNotVerified.html">RouteNotVerified</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/CENTAURUS_BRIDGE.sol/interface.IReputationManager.html">IReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/CENTAURUS_BRIDGE.sol/interface.IMonitoringHub.html">IMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/CENTAURUS_BRIDGE.sol/contract.CentaurusToken.html">CentaurusToken</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/bridge/CENTAURUS_BRIDGE.sol/contract.CentaurusBridge.html">CentaurusBridge</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/oracle/index.html">❱ oracle</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/oracle/PEGASUS_ORACLE.sol/error.RankInsufficient.html">RankInsufficient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/oracle/PEGASUS_ORACLE.sol/error.ZeroAddressDetected.html">ZeroAddressDetected</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/oracle/PEGASUS_ORACLE.sol/interface.IReputationManager.html">IReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/oracle/PEGASUS_ORACLE.sol/interface.IMonitoringHub.html">IMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/oracle/PEGASUS_ORACLE.sol/contract.PegasusToken.html">PegasusToken</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/integration/oracle/PEGASUS_ORACLE.sol/contract.PegasusOracle.html">PegasusOracle</a></span></li></ol></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/index.html">❱ interfaces</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAOXCAndromedaCore.sol/interface.IAOXCAndromedaCore.html">IAOXCAndromedaCore</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAOXCLockManager.sol/interface.IAOXCLockManager.html">IAOXCLockManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAOXCStorage.sol/interface.IAOXCStorage.html">IAOXCStorage</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAOXCStorage.sol/library.AOXCStorageLib.html">AOXCStorageLib</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAOXCSwap.sol/interface.IAOXCSwap.html">IAOXCSwap</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAOXCUpgradeAuthorizer.sol/interface.IAOXCUpgradeAuthorizer.html">IAOXCUpgradeAuthorizer</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAOXP.sol/interface.IAOXP.html">IAOXP</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IAssetBackingLedger.sol/interface.IAssetBackingLedger.html">IAssetBackingLedger</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IBridgeAdapter.sol/interface.IBridgeAdapter.html">IBridgeAdapter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/ICircuitBreaker.sol/interface.ICircuitBreaker.html">ICircuitBreaker</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IComplianceRegistry.sol/interface.IComplianceRegistry.html">IComplianceRegistry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IEmergencyPauseGuard.sol/interface.IEmergencyPauseGuard.html">IEmergencyPauseGuard</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IGovernance.sol/interface.IGovernance.html">IGovernance</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IGuardianRegistry.sol/interface.IGuardianRegistry.html">IGuardianRegistry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IIdentityRegistry.sol/interface.IIdentityRegistry.html">IIdentityRegistry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IJurisdictionRegistry.sol/interface.IJurisdictionRegistry.html">IJurisdictionRegistry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IMintController.sol/interface.IMintController.html">IMintController</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IMonitoringHub.sol/interface.IMonitoringHub.html">IMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IRedeemController.sol/interface.IRedeemController.html">IRedeemController</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IReputationManager.sol/interface.IReputationManager.html">IReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IRoleAuthority.sol/interface.IRoleAuthority.html">IRoleAuthority</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/ISecurityAssumptions.sol/interface.ISecurityAssumptions.html">ISecurityAssumptions</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/ISentinelExecutor.sol/interface.ISentinelExecutor.html">ISentinelExecutor</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/ISystemInvariant.sol/interface.ISystemInvariant.html">ISystemInvariant</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IThreatSurface.sol/interface.IThreatSurface.html">IThreatSurface</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/ITransferPolicy.sol/interface.ITransferPolicy.html">ITransferPolicy</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/ITreasury.sol/interface.ITreasury.html">ITreasury</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/interfaces/IVersion.sol/interface.IVersion.html">IVersion</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/libraries/index.html">❱ libraries</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/libraries/AOXCConstants.sol/library.AOXCConstants.html">AOXCConstants</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/libraries/AOXCErrors.sol/library.AOXCErrors.html">AOXCErrors</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/libraries/AOXCLogicLib.sol/library.AOXCLogicLib.html">AOXCLogicLib</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/math/index.html">❱ math</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/math/FixedPointMath.sol/library.FixedPointMath.html">FixedPointMath</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/index.html">❱ monitoring</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/AOXCBaseReporter.sol/abstract.AOXCBaseReporter.html">AOXCBaseReporter</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/AOXCInvariantChecker.sol/contract.AOXCInvariantChecker.html">AOXCInvariantChecker</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/ComplianceEvents.sol/contract.AOXCComplianceEvents.html">AOXCComplianceEvents</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/ForensicPulse.sol/contract.ForensicPulse.html">ForensicPulse</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/MonitoringHub.sol/contract.AOXCMonitoringHub.html">AOXCMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/RiskSignals.sol/contract.RiskSignals.html">RiskSignals</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/SequenceManager.sol/contract.SequenceManager.html">SequenceManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/monitoring/TransferAlerts.sol/contract.AOXCTransferAlerts.html">AOXCTransferAlerts</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/policy/index.html">❱ policy</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/policy/EmergencyTransferPolicy.sol/contract.AOXCEmergencyTransferPolicy.html">AOXCEmergencyTransferPolicy</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/policy/TransferPolicyEngine.sol/contract.AOXCTransferPolicyEngine.html">AOXCTransferPolicyEngine</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/index.html">❱ security</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/index.html">❱ sentinel</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/error.RankInsufficient.html">RankInsufficient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/error.ZeroAddressDetected.html">ZeroAddressDetected</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/error.CriticalOperationFailed.html">CriticalOperationFailed</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/interface.IReputationManager.html">IReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/interface.IMonitoringHub.html">IMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/interface.ISectorModule.html">ISectorModule</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/contract.QuasarToken.html">QuasarToken</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/QUASAR_SENTRY.sol/contract.QuasarSentry.html">QuasarSentry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/SOMBRERO_SENTINEL.sol/error.RankInsufficient.html">RankInsufficient</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/SOMBRERO_SENTINEL.sol/error.RedAlertRestrictionActive.html">RedAlertRestrictionActive</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/SOMBRERO_SENTINEL.sol/error.ZeroAddressDetected.html">ZeroAddressDetected</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/SOMBRERO_SENTINEL.sol/interface.IReputationManager.html">IReputationManager</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/SOMBRERO_SENTINEL.sol/interface.IMonitoringHub.html">IMonitoringHub</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/SOMBRERO_SENTINEL.sol/contract.SombreroToken.html">SombreroToken</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/sentinel/SOMBRERO_SENTINEL.sol/contract.SombreroSentinel.html">SombreroSentinel</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/AOXCCircuitBreaker.sol/contract.AOXCCircuitBreaker.html">AOXCCircuitBreaker</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/AOXCInvariantChecker.sol/contract.AOXCInvariantChecker.html">AOXCInvariantChecker</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/AOXCReentrancyGuard.sol/contract.AOXCReentrancyGuard.html">AOXCReentrancyGuard</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/AOXCSecurityAssumptions.sol/contract.AOXCSecurityAssumptions.html">AOXCSecurityAssumptions</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/AOXCSentinelExecutor.sol/contract.AOXCSentinelExecutor.html">AOXCSentinelExecutor</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/EmergencyPauseGuard.sol/contract.AOXCEmergencyPauseGuard.html">AOXCEmergencyPauseGuard</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/GuardianRegistry.sol/contract.AOXCGuardianRegistry.html">AOXCGuardianRegistry</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/ProofOfReserves.sol/contract.ProofOfReserves.html">ProofOfReserves</a></span></li><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/security/ThreatSurface.sol/contract.AOXCThreatSurface.html">AOXCThreatSurface</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/telemetry/index.html">❱ telemetry</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/telemetry/GasTelemetry.sol/contract.GasTelemetry.html">GasTelemetry</a></span></li></ol><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/upgrade/index.html">❱ upgrade</a><a class="chapter-fold-toggle"><div>❱</div></a></span><ol class="section"><li class="chapter-item "><span class="chapter-link-wrapper"><a href="src/upgrade/AOXCUpgradeManager.sol/contract.AOXCUpgradeManager.html">AOXCUpgradeManager</a></span></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

