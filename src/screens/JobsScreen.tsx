import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Job } from '../types/Job';
import { jobsApi } from '../services/api';
import { JobCard } from '../components/JobCard';
import { colors, spacing, borderRadius, typography } from '../theme/colors';

export const JobsScreen: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<number | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await jobsApi.getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      Alert.alert('Error', 'Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  }, [fetchJobs]);

  const handleSyncJobs = useCallback(async () => {
    try {
      setSyncing(true);
      const result = await jobsApi.syncJobs();
      Alert.alert(
        'Sync Complete',
        `Added: ${result.added} jobs\nSkipped: ${result.skipped} jobs`,
      );
      await fetchJobs();
    } catch (error) {
      console.error('Failed to sync jobs:', error);
      Alert.alert('Error', 'Failed to sync jobs. Please try again.');
    } finally {
      setSyncing(false);
    }
  }, [fetchJobs]);

  const handleToggleApplying = useCallback(async (job: Job) => {
    try {
      setApplyingJobId(job.id);

      if (!job.isApplying) {
        // Apply to the job
        console.log(job.sourceId);
        const jobAnnouncementId =
          job.jobAnnouncementId || parseInt(job.sourceId) || job.id;
        const companyId = job.companyId || 0;

        await jobsApi.applyToJob(jobAnnouncementId, companyId, job.title);

        // Update local state to mark as applying
        const updatedJob = await jobsApi.updateJob(job.id, {
          isApplying: true,
        });
        setJobs(prevJobs =>
          prevJobs.map(j => (j.id === job.id ? updatedJob : j)),
        );

        Alert.alert('Success', 'Application submitted successfully!');
      } else {
        // Unmark as applying
        const updatedJob = await jobsApi.updateJob(job.id, {
          isApplying: false,
        });
        setJobs(prevJobs =>
          prevJobs.map(j => (j.id === job.id ? updatedJob : j)),
        );
      }
    } catch (error) {
      console.error('Failed to update job:', error);
      Alert.alert('Error', 'Failed to apply to job. Please try again.');
    } finally {
      setApplyingJobId(null);
    }
  }, []);

  const handleJobPress = useCallback((job: Job) => {
    Alert.alert(
      job.title,
      `Company: ${job.company}\n\n${job.description}\n\nSource: ${job.source}`,
      [{ text: 'Close' }],
    );
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Seeker</Text>
        <TouchableOpacity
          style={styles.syncButton}
          onPress={handleSyncJobs}
          disabled={syncing}
        >
          <Text style={styles.syncButtonText}>
            {syncing ? 'Syncing...' : 'Sync Jobs'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{jobs.length}</Text>
          <Text style={styles.statLabel}>Total Jobs</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {jobs.filter(j => j.isApplying).length}
          </Text>
          <Text style={styles.statLabel}>Applying</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {jobs.filter(j => !j.isApplying).length}
          </Text>
          <Text style={styles.statLabel}>New</Text>
        </View>
      </View>

      {jobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No jobs found</Text>
          <TouchableOpacity
            style={styles.syncButtonLarge}
            onPress={handleSyncJobs}
            disabled={syncing}
          >
            <Text style={styles.syncButtonLargeText}>
              {syncing ? 'Syncing...' : 'Sync Jobs from staff.am'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() => handleJobPress(item)}
              onToggleApplying={() => handleToggleApplying(item)}
              isLoading={applyingJobId === item.id}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    ...typography.body,
    color: colors.textSecondary,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
  },
  syncButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  syncButtonText: {
    color: colors.white,
    ...typography.button,
    fontSize: 14,
  },
  statsContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  statNumber: {
    ...typography.h1,
    fontSize: 28,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textTertiary,
    marginBottom: spacing.xxl,
  },
  syncButtonLarge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  syncButtonLargeText: {
    color: colors.white,
    ...typography.button,
  },
});
