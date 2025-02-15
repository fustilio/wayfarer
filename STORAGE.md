CREATE POLICY "Enable storage access for users based on user_id" ON "storage"."objects"
AS PERMISSIVE FOR ALL
TO public
USING (bucket_id = 'pictures' AND (SELECT auth.uid()::text )= (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'pictures' AND (SELECT auth.uid()::text) = (storage.foldername(name))[1])
